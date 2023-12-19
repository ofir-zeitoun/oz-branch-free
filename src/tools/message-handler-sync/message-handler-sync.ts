import {
  BreakOnFirstActionable,
  ContinueAllActionable,
} from "../message-handler";

type BreakOnFirst = {
  breakOnFirst: true;
};

type BreakOnFirstActionableStatus = BreakOnFirstActionable & {
  get isContinued(): boolean;
};

type ContinueAll = {
  breakOnFirst: false;
};

type ContinueAllActionableStatus = ContinueAllActionable & {
  get isStopped(): boolean;
};

type When<MessageType> = (message: MessageType) => boolean;

type Handler<
  MessageType,
  ResultType = MessageType,
  Actionable extends
    | BreakOnFirstActionable
    | ContinueAllActionable = BreakOnFirstActionable
> = (message: MessageType, actionable: Actionable) => ResultType;

type MessageHandler<
  T,
  R,
  Actionable extends BreakOnFirstActionable | ContinueAllActionable
> = {
  subscribe(when: When<T>, handler: Handler<T, R, Actionable>): () => void;
  handle(message: T): R | undefined;
  clearAll(): void;
};

const getAction = (continueAll: boolean) =>
  continueAll
    ? () => {
        let stopped = false;
        return {
          stop() {
            stopped = true;
          },
          get isStopped() {
            return stopped;
          },
        };
      }
    : () => {
        let continued = false;
        return {
          next() {
            continued = true;
          },
          get isContinued() {
            return continued;
          },
        };
      };

function isBreakOnFirstAction(
  action: BreakOnFirstActionableStatus | ContinueAllActionableStatus
): action is BreakOnFirstActionableStatus {
  return "next" in action;
}

export function createMessageHandlerSync<
  T,
  R = T,
  Actionable extends
    | BreakOnFirstActionable
    | ContinueAllActionable = BreakOnFirstActionable
>(options?: BreakOnFirst): MessageHandler<T, R, BreakOnFirstActionable>;
export function createMessageHandlerSync<
  T,
  R = T,
  Actionable extends
    | BreakOnFirstActionable
    | ContinueAllActionable = ContinueAllActionable
>(options: ContinueAll): MessageHandler<T, R, ContinueAllActionable>;
export function createMessageHandlerSync<
  T,
  R = T,
  Actionable extends
    | BreakOnFirstActionable
    | ContinueAllActionable = BreakOnFirstActionable
>(options?: ContinueAll | BreakOnFirst): MessageHandler<T, R, Actionable> {
  const continueAll = options?.breakOnFirst === false;
  const subscribers = new Set<[When<T>, Handler<T, R, Actionable>]>();

  return {
    subscribe(when: When<T>, handler: Handler<T, R, Actionable>): () => void {
      const entry: [When<T>, Handler<T, R, Actionable>] = [when, handler];
      subscribers.add(entry);
      return () => {
        subscribers.delete(entry);
      };
    },

    clearAll(): void {
      subscribers.clear();
    },

    handle(message: T): R | undefined {
      let res: R | undefined = undefined;
      for (const [when, handler] of Array.from(subscribers)) {
        if (!when(message)) {
          continue;
        }
        const action = getAction(continueAll)();

        res = handler(message, action as unknown as Actionable);
        if (isBreakOnFirstAction(action)) {
          if (action.isContinued) {
            continue;
          }
          break;
        } else {
          if (action.isStopped) {
            break;
          }
        }
      }
      return res;
    },
  };
}

import Emitter from "@/object/Emitter";

type StateTransferFunction = (...args: Array<any>) => void;

export default class StateMachine<
  S extends string | number,
  A extends string | number,
  Topic extends string | number
> extends Emitter<Topic> {
  private state: S;
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>;

  constructor(initialS: S) {
    super();
    this.state = initialS;
    this.transferTable = new Map();
  }

  private addTransfer(form: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.transferTable.has(form)) {
      this.transferTable.set(form, new Map());
    }
    const adjTable = this.transferTable.get(form);
    adjTable?.set(action, [fn, to]);
  }

  public register(
    from: S | S[],
    to: S,
    action: A,
    fn: StateTransferFunction
  ): void {
    if (Array.isArray(from)) {
      from.forEach((t) => {
        this.addTransfer(t, to, action, fn);
      });
    } else {
      this.addTransfer(from, to, action, fn);
    }
  }

  public dispatch(action: A, ...data: Array<any>): boolean {
    const adjTable = this.transferTable.get(this.state);
    const transfer = adjTable?.get(action);
    if (!transfer) {
      return false;
    }
    const [fn, nextS] = transfer;
    fn && fn(data);
    this.state = nextS;

    //自动转换状态 <auto>，0
    // action为 <auto> 时自动转换到下一个状态
    while (this.dispatch("<auto>" as A, ...data));
    return true;
  }
}

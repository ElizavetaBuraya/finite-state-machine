class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config != null)
      {
        this.config = config;
        this.curState = this.config.initial;
        this.stateStack = [];
        this.lastState = [];
        this.stateStack.push(this.curState);
      }
      else throw new Error();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.curState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.config.states.hasOwnProperty(state))
      {
        this.curState=state;
        this.stateStack.push(this.curState);
        this.lastState = []; //disable redo
      }
      else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var canChangeState = false;

          if (this.config.states[this.curState].transitions.hasOwnProperty(event))
          {
            this.curState = this.config.states[this.curState].transitions[event];
            this.stateStack.push(this.curState);
            this.lastState = []; //disable redo
            canChangeState = true;
          }

      if (canChangeState == false)
      {
          throw new Error();
      }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.curState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var getStatesArray = Object.keys(this.config.states);
      if (event == undefined)
      {
          return getStatesArray;
      }
      else {
        var statesArray  = [];
        for (var key in getStatesArray)
        {
          if (this.config.states[getStatesArray[key]].transitions.hasOwnProperty(event))
            statesArray.push(getStatesArray[key]);
        }
        return statesArray;
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.stateStack.length > 1)
      {
        this.lastState.push(this.stateStack.pop());
        this.curState = this.stateStack[this.stateStack.length-1];

        return true;
      }
      else
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.lastState.length != 0)
      {
        this.stateStack.push(this.lastState.pop());
        this.curState = this.stateStack[this.stateStack.length-1];

        return true;
      }
      else
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.lastState.length = 0;
      this.stateStack.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

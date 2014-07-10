/**
 * This class is an implementation of a turnstile as a finite state machine.
 *
 * It as a single API function state.
 * Calling state() with no arguments prints the current state
 * Calling state(Turnstile.EventEnum.COIN) or state(Turnstile.EventEnum.PUSH) 
 * triggers a state change according to the current state of the machine. 
 */
function Turnstile() {

	// privates
	var _state = Turnstile.StateEnum.LOCKED;

	// public functions
	this.state = function() {
		// no arguments - return the current state
		if (arguments.length === 0)
			return _state;

		// get the input
		var inputEvent = arguments[0];

		// actions
		switch (inputEvent) {
			case Turnstile.EventEnum.COIN:
				this._coin();
				break;
			case Turnstile.EventEnum.PUSH:
				this._push();
				break;
			default:
				// noop
		}

		return _state;
	};

	// private functions
		
	/**
	 * When a coin event occurs update the state according to current state.
	 * If current state is locked, unlock it. Otherwise no change.
	 * @return The state of the turnstile
	 */
	this._coin = function() {
		switch (_state) {
			case Turnstile.StateEnum.LOCKED:
				_state = Turnstile.StateEnum.UNLOCKED;
				break;
			case Turnstile.StateEnum.UNLOCKED:
			default:
				// noop
		}
		return _state;
	};

	/**
	 * When a push event occurs update the state according to current state
	 * If current state is unlocked, lock it. Otherwise no change.
	 * @return The state of the turnstile
	 */
	this._push = function() {
		switch (_state) {
			case Turnstile.StateEnum.UNLOCKED:
				_state = Turnstile.StateEnum.LOCKED;
				break;
			case Turnstile.StateEnum.LOCKED:
			default:
				// noop
		}
		return _state;
	};

	// print the current state
	this._printState = function() {
		return _state === Turnstile.StateEnum.LOCKED ? "Locked" : "Unlocked";
	};
}

Turnstile.StateEnum = {
	LOCKED: 0,
	UNLOCKED: 1
};
Turnstile.EventEnum = {
	COIN: 0,
	PUSH: 1
};

// document ready
$(function() {
	var t = new Turnstile(),
		$machine = $('.machine'),
		setState = function() {
			var $btn = $(this);
			var state = $btn.attr('id') == 'coin' ? Turnstile.EventEnum.COIN : Turnstile.EventEnum.PUSH;
			state = t.state(state);
			updateUI(state);
		},
		updateUI = function(state) {
			switch (state) {
				case Turnstile.StateEnum.LOCKED:
					$machine.removeClass('unknown unlocked').addClass('locked');
					$machine.text('Locked');
					break;
				case Turnstile.StateEnum.UNLOCKED:
					$machine.removeClass('unknown locked').addClass('unlocked');
					$machine.text('Unlocked');
					break;
				default:
					$machine.removeClass('unlocked locked').addClass('unknown');
					$machine.text('Unknown');
			}
		};

	// bind the buttons
	$('button').click(setState);
	updateUI(t.state());
});
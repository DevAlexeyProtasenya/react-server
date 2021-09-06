"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = exports.Room = void 0;
class Room {
    constructor($id, $state) {
        this.id = $id;
        this.state = $state;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
}
exports.Room = Room;
var GameState;
(function (GameState) {
    GameState["waitingForPlayer"] = "Waiting for players";
    GameState["playing"] = "Playing";
})(GameState = exports.GameState || (exports.GameState = {}));
//# sourceMappingURL=Room.js.map
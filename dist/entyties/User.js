"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.User = void 0;
class User {
    constructor($id, $name, $surname, $jobPosition, $role, $room) {
        this.id = $id;
        this.name = $name;
        this.surname = $surname;
        this.role = $role;
        this.room = $room;
        this.jobPosition = $jobPosition;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getSurname() {
        return this.surname;
    }
    setSurname(surname) {
        this.surname = surname;
    }
    getRoom() {
        return this.room;
    }
    setRoom(room) {
        this.room = room;
    }
    getJobPosition() {
        return this.jobPosition;
    }
    setJobPosition(jobPosition) {
        this.jobPosition = jobPosition;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
}
exports.User = User;
var Role;
(function (Role) {
    Role["diler"] = "diler";
    Role["observer"] = "observer";
    Role["player"] = "player";
})(Role = exports.Role || (exports.Role = {}));
//# sourceMappingURL=User.js.map
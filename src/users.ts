import { User } from "./User";
import {isEqual} from 'lodash';

const user1 = new User('a@gmail.com', 'qwerty');
const user2 = new User('cat@yandex.ru', 'meow');
const user3 = new User('dog@mail.ru', 'woof');
const user4 = new User('myemail@gmail.com', 'password')

const users = [user1, user2, user3, user4];

function includeUser(users: User[], user: User){
    for (let curUser of users){
        if (isEqual(curUser, user)) {
            return true;
        }
    }
    return false;
}

export {users, includeUser};
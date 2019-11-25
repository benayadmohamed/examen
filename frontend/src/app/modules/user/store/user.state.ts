import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LoadPrivilagesRequest} from './user.actions';
import {Observable, of} from 'rxjs';
import {UserService} from "../user.service";

export interface UserStateModel {
  isLoading: boolean;
  privileges: string[];
  isLoaded: boolean;

}


@State<UserStateModel>({
  name: 'user',
  defaults: {
    privileges: [],
    isLoaded: false,
    isLoading: false,
  }
})
export class UserState {
  constructor(private userService: UserService) {
  }

  @Selector()
  static privileges(state: UserStateModel) {
    return state.privileges;
  }

  @Selector()
  static isLoaded(state: UserStateModel) {
    return state.isLoaded;
  }

  @Selector()
  static isLoading(state: UserStateModel) {
    return state.isLoading;
  }

  @Action(LoadPrivilagesRequest)
  loadUsers(ctx: StateContext<UserStateModel>, {}: LoadPrivilagesRequest) {
    const state = ctx.getState();
    if (!state.isLoaded) {
      return ctx.setState({...state, privileges: this.userService.getPermissions(), isLoaded: true});
    } else {
      return of();
    }
  }

  // @Action(AddUserRequest)
  // addUser(ctx: StateContext<UserStateModel>, {payload}: AddUserRequest) {
  //   ctx.setState({...ctx.getState(), isLoading: true});
  //   return this.userService.save(payload.user).pipe(tap(x => {
  //     ctx.setState(
  //       patch({
  //         users: append([x]),
  //       })
  //     );
  //     ctx.setState({...ctx.getState(), isLoading: true});
  //   }));
  // }
  //
  // @Action(DeleteUserRequest)
  // removeUser(ctx: StateContext<UserStateModel>, {payload}: DeleteUserRequest) {
  //   ctx.setState({...ctx.getState(), isLoading: true});
  //   return this.userService.delete(payload.id).pipe(tap(x => {
  //     ctx.setState(
  //       patch({
  //         users: removeItem<User>(value => value.id === payload.id)
  //       })
  //     );
  //     ctx.setState({...ctx.getState(), isLoading: false});
  //   }));
  // }
  //
  //
  // @Action(UpdateUserRequest)
  // changeUser(ctx: StateContext<UserStateModel>, {payload}: UpdateUserRequest) {
  //   ctx.setState(
  //     patch({
  //       users: updateItem<User>(value => value.id === payload.user.id, payload.user)
  //     })
  //   );
  // }

}

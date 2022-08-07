import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { User } from '../components/pages/Account/Account';
import Api from '../services/Api';


export const getUsers: AsyncThunk<User[], void, {}> = createAsyncThunk('getUsers', async () => {
  const response: User[] = await Api.getAll<User>("users");
  return response;
});

export const addUser: AsyncThunk<User, User, {}> = createAsyncThunk('addUser', async (body: User) => {
  const response: User = await Api.create('users', body)
  return response
});

export const editUser: AsyncThunk<User, { id: string; body: User }, {}> = createAsyncThunk('editUser', async ({ id, body }: { id: string, body: User }) => {
  const response: User = await Api.change<User>('users', id, body)
  return response
});

export const deleteUser: AsyncThunk<string, string, {}> = createAsyncThunk('deleteUser', async (id: string) => {
  await Api.delete('users', id);
  return id;
});

export const searchUser: AsyncThunk<User[], string, {}> = createAsyncThunk('getUsers', async (searchParam: string) => {
  const response: User[] = await Api.getAll<User>("users").then((response: User[]) => response);
  return response.filter((i: User) => i.name.toLowerCase().includes(searchParam.toLowerCase()));
});

const initialState = {
  loadingState: 'initial',
  users: [],
} as UsersSliceType;

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersSliceType>) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loadingState = 'loading'
    });

    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loadingState = 'ready';
      state.users = action.payload;
    });

    builder.addCase(getUsers.rejected, (state) => {
      state.loadingState = 'error';
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loadingState = 'loading'
    });

    builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.loadingState = 'ready';
      state.users = state.users.filter((message) => message.id !== action.payload);
    });

    builder.addCase(deleteUser.rejected, (state) => {
      state.loadingState = 'error';
    });

    builder.addCase(editUser.pending, (state) => {
      state.loadingState = 'loading'
    });
    builder.addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loadingState = 'ready';
      state.users = state.users.reduce((acc: User[], next: User) => {
        if (next.id === action.payload.id) {
          next = action.payload
        }
        acc.push(next);
        return acc;
      }, []);
    });
    builder.addCase(editUser.rejected, (state) => {
      state.loadingState = 'error';
    });

    builder.addCase(addUser.pending, (state) => {
      state.loadingState = 'loading'
    });

    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loadingState = 'ready';
      state.users = state.users.concat(action.payload);
    });

    builder.addCase(addUser.rejected, (state) => {
      state.loadingState = 'error';
    });
  }
});

export const selectUsers: (state: RootState) => UsersSliceType = (state: RootState) => state.users;

export const { resetState } = usersSlice.actions;

export default usersSlice.reducer;

type UsersSliceType = {
  loadingState: string;
  users: User[];
}
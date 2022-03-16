import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoomState } from "../reducers/rooms.reducer";

export const featureSelector
  = createFeatureSelector<RoomState>('roomPage');

export const loadRooms = createSelector(
  featureSelector,
  state => state.rooms
);

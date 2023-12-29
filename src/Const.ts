import {Vector3} from 'three';
import {DollyState} from './MVC/Dolly/Model/DollyState';

export const FORWARD_VELOCITY = 0.03;
export const VERTICAL_VELOCITY = 0.005;
export const SIDEWAYS_VELOCITY = 0.015;
export const BODY_HEIGHT = 1.7;
export const HEIGHT_2F = 3;
export const SKY_COLOR = 0x1390ff;
export const HOME_MODEL_URL = 'home.glb';
export const DOOR_CLOSED_MODEL_URL = 'door-closed.glb';
export const DOOR_OPENED_MODEL_URL = 'door-opened.glb';
export const ENTRANCE_POSITION = new Vector3(-4.5, 0, -8);
export const BASE_FPS = 60;
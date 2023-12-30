import {Euler, Vector3} from 'three';
import {DollyState} from './DollyModel';

export const DOLLY_STATE_MAP: { [key in string]: Readonly<DollyState> } = {
    'NETATOMO-PERSONAL-WEATHER-STATION-1F': new DollyState(
        new Euler(-0.731, -1.571, 0, 'YXZ'),
        new Vector3(-0.311, 0, 2.332),
    ),
    'NETATOMO-PERSONAL-WEATHER-STATION-2F': new DollyState(
        new Euler(-1.089, -12.559, 0, 'YXZ'),
        new Vector3(-2.670, 3, 2.570),
    ),
    'GOOGLE-NESTMINI-1F': new DollyState(
        new Euler(-0.731, -1.571, 0, 'YXZ'),
        new Vector3(-0.311, 0, 2.275),
    ),
    'GOOGLE_NESTMINI-2F': new DollyState(
        new Euler(-1.089, -12.559, 0, 'YXZ'),
        new Vector3(-2.521, 3, 2.569),
    ),
    'KARITA-NICECUT-G': new DollyState(
        new Euler(-0.614, -2.215, 0, 'YXZ'),
        new Vector3(1.277, 0, 2.078),
    ),
    'SHARP-HOTCOOK': new DollyState(
        new Euler(-0.636, -1.828, 0, 'YXZ'),
        new Vector3(1.323, 0, 2.017),
    ),
    'SFORNATUTTO-EVO': new DollyState(
        new Euler(-0.647, -1.568, 0, 'YXZ'),
        new Vector3(1.355, 0, 1.733),
    ),
    'PANASONIC-BISTRO': new DollyState(
        new Euler(-0.647, -1.568, 0, 'YXZ'),
        new Vector3(1.353, 0, 1.237),
    ),
    'YAMAZEN-KETTLE': new DollyState(
        new Euler(-0.643, -1.567, 0, 'YXZ'),
        new Vector3(1.353, 0, 1.237),
    ),
    'PANASONIC-DISHWASHER': new DollyState(
        new Euler(0.518, 0.529, 0, 'YXZ'),
        new Vector3(1.334, 0, 1.460),
    ),
    'DAINICHI-HUMIDIFIER': new DollyState(
        new Euler(-0.761, -1.855, 0, 'YXZ'),
        new Vector3(-1.959, 0, 2.513),
    ),
    'ROOMBA': new DollyState(
        new Euler(-0.869, -2.505, 0, 'YXZ'),
        new Vector3(-1.733, 0, 2.734),
    ),
    'PANASONIC-VIERA': new DollyState(
        new Euler(-0.702, -4.725, 0, 'YXZ'),
        new Vector3(-2.891, 0, 1.578),
    ),
    'CISCO-WAP150-1F': new DollyState(
        new Euler(-0.611, -7.840, 0, 'YXZ'),
        new Vector3(-0.818, 0, 0.752),
    ),
    'LATTE': new DollyState(
        new Euler(-0.622, -7.793, 0, 'YXZ'),
        new Vector3(-0.430, 0, 2.758),
    ),
    'NATURE-REMO-3': new DollyState(
        new Euler(-0.298, -7.851, 0, 'YXZ'),
        new Vector3(-0.271, 0, 2.435),
    ),
    'NATURE-REMO-E': new DollyState(
        new Euler(-1.024, -5.428, 0, 'YXZ'),
        new Vector3(-2.350, 0, -0.751),
    ),
    'NATURE-REMO-MINI': new DollyState(
        new Euler(-1.089, -12.550, 0, 'YXZ'),
        new Vector3(-2.431, 3, 2.568),
    ),
    'CISCO-WAP150-2F': new DollyState(
        new Euler(-0.792, -4.534, 0, 'YXZ'),
        new Vector3(-1.350, 3, 1.077),
    ),
    'KUNIWAK': new DollyState(
        new Euler(-0.822, -7.429, 0, 'YXZ'),
        new Vector3(-2.771, 3, 3.270),
    ),
    'SIGMA-FP': new DollyState(
        new Euler(-0.809, -9.458, 0, 'YXZ'),
        new Vector3(-2.321, 3, 2.710),
    ),
    'MAC-STUDIO': new DollyState(
        new Euler(-1.133, -9.418, 0, 'YXZ'),
        new Vector3(-2.208, 3, 3.296),
    ),
    'HAKUBA-CABINET': new DollyState(
        new Euler(-1.022, -12.080, 0, 'YXZ'),
        new Vector3(-2.469, 3, 2.791),
    ),
    'LYSIN-ROOMRUNNER': new DollyState(
        new Euler(-0.699, -14.940, 0, 'YXZ'),
        new Vector3(-2.880, 3, 1.917),
    ),
};

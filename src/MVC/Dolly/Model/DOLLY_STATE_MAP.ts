import {Vector3} from 'three';
import {DollyState, IReadonlyDollyState} from './DollyState';

export const DOLLY_STATE_MAP: {[key in string]: IReadonlyDollyState} = {
    "NETATOMO-PERSONAL-WEATHER-STATION-1F": new DollyState(-0.731, -1.571, new Vector3(-0.311, 0, 2.332)),
    "NETATOMO-PERSONAL-WEATHER-STATION-2F": new DollyState(-1.089, -12.559, new Vector3(-2.670, 3, 2.570)),
    "GOOGLE-NESTMINI-1F": new DollyState(-0.731, -1.571, new Vector3(-0.311, 0, 2.275)),
    "GOOGLE_NESTMINI-2F": new DollyState(-1.089, -12.559, new Vector3(-2.521, 3, 2.569)),
    "KARITA-NICECUT-G": new DollyState(-0.614, -2.215, new Vector3(1.277, 0, 2.078)),
    "SHARP-HOTCOOK": new DollyState(-0.636, -1.828, new Vector3(1.323, 0, 2.017)),
    "SFORNATUTTO-EVO": new DollyState(-0.647, -1.568, new Vector3(1.355, 0, 1.733)),
    "PANASONIC-BISTRO": new DollyState(-0.647, -1.568, new Vector3(1.353, 0, 1.237)),
    "YAMAZEN-KETTLE": new DollyState(-0.643, -1.567, new Vector3(1.353, 0, 1.237)),
    "PANASONIC-DISHWASHER": new DollyState(0.518, 0.529, new Vector3(1.334, 0, 1.460)),
    "DAINICHI-HUMIDIFIER": new DollyState(-0.761, -1.855, new Vector3(-1.959, 0, 2.513)),
    "ROOMBA": new DollyState(-0.869, -2.505, new Vector3(-1.733, 0, 2.734)),
    "PANASONIC-VIERA": new DollyState(-0.702, -4.725, new Vector3(-2.891, 0, 1.578)),
    "CISCO-WAP150-1F": new DollyState(-0.611, -7.840, new Vector3(-0.818, 0, 0.752)),
    "LATTE": new DollyState(-0.622, -7.793, new Vector3(-0.430, 0, 2.758)),
    "NATURE-REMO-3": new DollyState(-0.298, -7.851, new Vector3(-0.271, 0, 2.435)),
    "NATURE-REMO-E": new DollyState(-1.024, -5.428, new Vector3(-2.350, 0, -0.751)),
    "NATURE-REMO-MINI": new DollyState(-1.089, -12.550, new Vector3(-2.431, 3, 2.568)),
    "CISCO-WAP150-2F": new DollyState(-0.792, -4.534, new Vector3(-1.350, 3, 1.077)),
    "KUNIWAK": new DollyState(-0.822, -7.429, new Vector3(-2.771, 3, 3.270)),
    "SIGMA-FP": new DollyState(-0.809, -9.458, new Vector3(-2.321, 3, 2.710)),
    "MAC-STUDIO": new DollyState(-1.133, -9.418, new Vector3(-2.208, 3, 3.296)),
    "HAKUBA-CABINET": new DollyState(-1.022, -12.080, new Vector3(-2.469, 3, 2.791)),
    "LYSIN-ROOMRUNNER": new DollyState(-0.699, -14.940, new Vector3(-2.880, 3, 1.917)),
};

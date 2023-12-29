import Typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// noinspection JSUnusedGlobalSymbols
export default async () => {
	return {
		input: 'src/index.ts',
		output: {
			file: 'public/bundle.js',
			format: 'umd',
			name: 'HomeVr',
		},
		plugins: [
			Typescript({
				tsconfig: 'tsconfig.json',
			}),
			nodeResolve(),
		],

		// Suppress `Circular dependency` warning
		onwarn(warning, rollupWarn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			rollupWarn(warning);
		},
	};
};

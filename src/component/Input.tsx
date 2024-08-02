import { useState } from 'react';
import type { RULES, RULES_SYNC } from 'ivl'
import { getValueErrors } from 'ivl';

type Props = {
	rules: RULES | RULES_SYNC
};

const default_props = {
	rules: {},
};

export const Input = (props: Props, ...extra: unknown[]) => {
	const [value, setValue] = useState<string>('');
	const [errors, setErrors] = useState<string[]>([]);
	const max_length = Object.keys(props.rules).length;

	// Add default props
	props = { ...default_props, ...props };

	return (
		<div>
			<input {...extra} value={value} onInput={async (e) => {
				const { value } = e.target as HTMLInputElement;
				setErrors(await getValueErrors(value, props.rules))
				setValue(value);
			}} />
			<div>
				{Array.from({ length: max_length }, (_, i) => errors[i] ?? "")}
			</div>
		</div>
	)
}
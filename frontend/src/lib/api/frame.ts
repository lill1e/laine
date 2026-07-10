export interface FrameLike {
	readonly rollOne: number | null;
	readonly rollTwo: number | null;
	readonly extraRoll: number | null;
	readonly split: boolean;
}

export interface FrameLikeTotalled extends FrameLike {
	readonly total: number;
}

export interface APIFrame {
	roll_one: number;
	roll_two: number | null;
	split: boolean;
	extra_roll: number | null;
}

export class Frame implements FrameLike {
	static readonly EMPTY = new Frame(
		{
			roll_one: 0,
			roll_two: 0,
			extra_roll: 0,
			split: false
		},
		0
	);

	readonly rollOne: number;
	readonly rollTwo: number | null;
	readonly extraRoll: number | null;
	readonly split: boolean;
	readonly total: number;

	constructor(data: APIFrame, total: number) {
		this.rollOne = data.roll_one;
		this.rollTwo = data.roll_two;
		this.extraRoll = data.extra_roll;
		this.split = data.split;

		this.total = total;
	}
}

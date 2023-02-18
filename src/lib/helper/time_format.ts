export { TimeFormat };

class TimeFormat {
	private readonly time_stamp: number;
	private readonly days: number;
	private readonly hours: number;
	private readonly minutes: number;
	private readonly seconds: number;
	private readonly milli_seconds: number;

	constructor(time_stamp: number) {
		this.time_stamp = time_stamp;
		let hours_rest = time_stamp % 86_400_000;
		this.days = (this.time_stamp - hours_rest) / 86_400_000;
		let minutes_rest = hours_rest % 3_600_000;
		this.hours = (hours_rest - minutes_rest) / 3_600_000;
		let second_rest = minutes_rest % 60_000;
		this.minutes = (minutes_rest - second_rest) / 60_000;
		let milli_seconds_rest = second_rest % 1_000;
		this.seconds = (second_rest - milli_seconds_rest) / 1000;
		this.milli_seconds = milli_seconds_rest;
	}

	getTimeHoursMinutesSecounds(): string {
		const colon_separator = ":";
		return `${this.getHours()}${colon_separator}${this.getMinutes()}${colon_separator}${this.getSecond()}`;
	}

	getDays(leading_digits_count: number = 2): string {
		return this.days.toLocaleString("de-DE", { minimumIntegerDigits: leading_digits_count });
	}

	getHours(leading_digits_count: number = 2): string {
		return this.hours.toLocaleString("de-DE", { minimumIntegerDigits: leading_digits_count });
	}

	getMinutes(leading_digits_count: number = 2): string {
		return this.minutes.toLocaleString("de-DE", { minimumIntegerDigits: leading_digits_count });
	}

	getSecond(leading_digits_count: number = 2): string {
		return this.seconds.toLocaleString("de-DE", { minimumIntegerDigits: leading_digits_count });
	}

	getMilliSecond(leading_digits_count: number = 3): string {
		return this.milli_seconds.toLocaleString("de-DE", {
			minimumIntegerDigits: leading_digits_count,
		});
	}
}

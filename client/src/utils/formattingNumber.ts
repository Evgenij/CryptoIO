export function formattingNumber(value: number, fraction = 1): string {
	return new Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: fraction,
	}).format(value);
}

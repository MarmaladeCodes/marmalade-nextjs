export enum DateFormatType {
	DATE = 'MMMM dd, yyyy',
	TIME = 'h:mm'
}

export type DateFormat = DateFormatType.DATE | DateFormatType.TIME | string

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc'
}

export type SortOrderType = SortOrder.ASC | SortOrder.DESC

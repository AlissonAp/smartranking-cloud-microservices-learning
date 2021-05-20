import { ApiProperty } from "@nestjs/swagger";

export type CategoryId = string;
export type PlayerId = string;

export class Event {
    @ApiProperty()
    name: string;
    @ApiProperty()
    operation: string;
    @ApiProperty()
    value: number;
}

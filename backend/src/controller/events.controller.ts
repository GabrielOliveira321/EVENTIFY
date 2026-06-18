import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService, TransformedEvent } from '../service/events.service';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Get()
  async searchEvents(
    @Query('q') query?: string,
    @Query('location') location?: string,
  ): Promise<TransformedEvent[]> {
    return this.eventsService.searchEvents(query || 'eventos', location || 'Brazil');
  }

  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<TransformedEvent | null> {
    return this.eventsService.getEventById(id);
  }
}

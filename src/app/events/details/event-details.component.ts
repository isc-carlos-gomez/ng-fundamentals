import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Event, Session } from '../shared/event.model';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image { height: 100px; }
    a { cursor: pointer; }
  `]
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  addMode: boolean;
  filter = 'all';
  order = 'byName';

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.forEach(data => {
      this.event = data['event'];
      this.addMode = false;
      this.filter = 'all';
      this.order = 'byName';
    });
  }

  addSession(): void {
    this.addMode = true;
  }

  saveAddedSession(session: Session): void {
    const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = maxId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession(): void {
    this.addMode = false;
  }

  setFilter(filter: string): void {
    this.filter = filter;
  }

  setOrder(order: string): void {
    this.order = order;
  }

}

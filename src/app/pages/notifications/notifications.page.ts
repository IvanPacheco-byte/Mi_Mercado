import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeft, Bell, LucideAngularModule } from 'lucide-angular';
import { AppNotification } from '../../models';
import { NotificationService, relativeTime } from '../../services/notification.service';
import { NOTIFICATION_TYPE_META } from '../../shared/notification-utils';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  imports: [LucideAngularModule],
})
export class NotificationsPage {
  private router = inject(Router);
  readonly notifications = inject(NotificationService);

  readonly BackIcon = ArrowLeft;
  readonly BellIcon = Bell;
  readonly typeMeta = NOTIFICATION_TYPE_META;
  readonly relativeTime = relativeTime;

  goBack(): void {
    this.router.navigateByUrl('/inicio');
  }

  open(notification: AppNotification): void {
    this.router.navigate(['/notificaciones', notification.id]);
  }
}

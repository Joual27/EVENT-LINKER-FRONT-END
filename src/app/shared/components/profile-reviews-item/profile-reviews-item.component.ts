import { Component, Input } from '@angular/core';
import { Review } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-reviews-item',
  imports: [CommonModule],
  templateUrl: './profile-reviews-item.component.html',
  styleUrl: './profile-reviews-item.component.css'
})
export class ProfileReviewsItemComponent {
  @Input() review !: Review;


  formatTimeAgo(date: Date | string): string {
    if (!date) return ""

    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    const diffWeek = Math.floor(diffDay / 7)
    const diffMonth = Math.floor(diffDay / 30)
    const diffYear = Math.floor(diffDay / 365)

    if (diffSec < 60) {
      return "just now"
    } else if (diffMin < 60) {
      return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`
    } else if (diffHour < 24) {
      return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`
    } else if (diffDay < 7) {
      return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`
    } else if (diffWeek < 4) {
      return `${diffWeek} ${diffWeek === 1 ? "week" : "weeks"} ago`
    } else if (diffMonth < 12) {
      return `${diffMonth} ${diffMonth === 1 ? "month" : "months"} ago`
    } else {
      return `${diffYear} ${diffYear === 1 ? "year" : "years"} ago`
    }
  }

  createRange(length: number): number[] {
    return new Array(length).fill(0).map((_, index) => index)
  }
}

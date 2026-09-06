export const NotificationType = {
  NEW_STUDENT_ENROLLED: 'New student enrolled',
  ASSIGNMENT_SUBMITTED: 'Assignment submitted',
  PARENT_MEETING_SCHEDULED: 'Parent meeting scheduled',
  ATTENDANCE_REPORT_READY: 'Attendance report ready',
  NEW_PARENT_ENROLLED: 'New parent enrolled',
} as const satisfies Record<string, string>;

export type NotificationType = keyof typeof NotificationType;

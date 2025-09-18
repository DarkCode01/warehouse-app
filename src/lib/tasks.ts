import { AuditTaskStatus } from '@/core/enums/audit';
import { AuditTask } from '@/core/models/audit';

export const countTasksCompleted = (tasks: Array<AuditTask>) => {
    if (tasks.length === 0) return 0;

    return tasks.reduce((acc, curr) => {
      if (curr.status === AuditTaskStatus.DONE) return acc + 1;
      return acc;
    }, 0);
}
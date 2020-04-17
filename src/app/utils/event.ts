import { Subject } from 'rxjs';
import { Lock } from '../types/lock';
import { IMessageDialog } from '../types/message-dialog';
import { ISelectionDialog } from '../types/selection-dialog';

class Event {
  lockUI: Subject<Lock> = new Subject();
  messageDialog: Subject<IMessageDialog> = new Subject();
  messageSnackBar: Subject<IMessageDialog> = new Subject();
  selectionDialog: Subject<ISelectionDialog> = new Subject();
  atBottom: Subject<boolean> = new Subject();
  toTop: Subject<boolean> = new Subject();
}

export default new Event();

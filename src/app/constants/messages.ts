const MESSAGES = {
  S000: { type: 'error', title: 'ERROR', message: 'Unexpected error(Client)'},
  S001: { type: 'error', title: 'ERROR', message: 'Network error'},
  S002: { type: 'error', title: 'ERROR', message: 'Unexpected error(Server)'},
  S003: { type: 'error', title: 'ERROR', message: 'Unexpected error(Database)'},
  S004: { type: 'error', title: 'ERROR', message: 'Unexpected error(Storage)'},
  B001: { type: 'error', title: 'ERROR', message: 'Account is already exists'},
  B002: { type: 'error', title: 'ERROR', message: 'Account or password error'},
  B003: { type: 'error', title: 'ERROR', message: 'Please input account and password'},
  B004: { type: 'error', title: 'ERROR', message: 'No data exists'},
  B005: { type: 'error', title: 'ERROR', message: 'You do not have permission to access the page'},
  I001: { type: 'info', title: 'INFO', message: 'Saved'},
  I002: { type: 'info', title: 'INFO', message: 'Deleted'},
  I003: { type: 'info', title: 'INFO', message: 'Are you sure to delete?'},
  I004: { type: 'info', title: 'INFO', message: 'Are you sure to sign out?'}
};

export default MESSAGES;

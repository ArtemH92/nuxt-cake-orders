interface OrderData {
  id: string;
  dessert: string;
  cakeType: string;
  cupcakesType: string;
  filling: string;
  quantity: number | null;
  dateTime: string;
  status: string;
  notes: string;
}

export class AllOrders {
  id: string;
  dessert: string;
  cakeType: string;
  cupcakesType: string;
  filling: string;
  quantity: number | null;
  dateTime: string;
  statusTag: string;
  severityTag: string;
  status: string;
  labelStatusBtn: string;
  notes: string;

  constructor(data: OrderData = {
    id: '',
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    dateTime: '',
    status: '',
    notes: ''
  }) {
    this.id = data.id;
    this.dessert = data.dessert;
    this.cakeType = data.cakeType;
    this.cupcakesType = data.cupcakesType;
    this.filling = data.filling;
    this.quantity = data.quantity;
    this.dateTime = data.dateTime;
    this.statusTag = this.getStatusTag(data.status);
    this.severityTag = this.getSeverityTag(data.status);
    this.status = data.status;
    this.labelStatusBtn = this.getLabelStatusBtn(data.status);
    this.notes = data.notes;
  }

  private getStatusTag(status: string): string {
    switch (status) {
      case 'inProcessing': return 'В обработке';
      case 'inProgress': return 'Взяли в работу';
      case 'done': return 'Заказ готов';
      default: return '';
    }
  }

  private getSeverityTag(status: string): string {
    switch (status) {
      case 'inProcessing': return 'secondary';
      case 'inProgress': return 'warn';
      case 'done': return 'success';
      default: return '';
    }
  }

  private getLabelStatusBtn(status: string): string {
    switch (status) {
      case 'inProcessing': return 'Принять в работу';
      case 'inProgress': return 'Приготовить заказ';
      default: return '';
    }
  }
}

export class SingleOrder {
  id: string;
  dessert: string;
  cakeType: string;
  cupcakesType: string;
  filling: string;
  quantity: number;
  dateTime: Date;
  status: string;
  notes: string;

  constructor(data: OrderData = {
    id: '',
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    dateTime: '',
    status: '',
    notes: ''
  }) {
    this.id = data.id;
    this.dessert = data.dessert;
    this.cakeType = data.cakeType;
    this.cupcakesType = data.cupcakesType;
    this.filling = data.filling;
    this.quantity = +data.quantity!;
    this.dateTime = new Date(data.dateTime);
    this.status = data.status;
    this.notes = data.notes;
  }
}
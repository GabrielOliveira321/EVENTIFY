export class PurchaseDto {
  eventId: number;
  eventTitle: string;
  ticketType: string;
  ticketName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  installments?: number;
  discountType?: string;
}

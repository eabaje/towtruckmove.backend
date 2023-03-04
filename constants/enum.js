export const LOAD_TYPE = [
  { value: "SemiTrailer", text: "Semi Trailer" },
  { value: "StraightTruck", text: "Straight Truck" },
  { value: "TailLiftTruck", text: "TailLift Truck" },
  { value: "JumboTrailer", text: "Jumbo Trailer" },
  { value: "TruckTrailer", text: "Truck Trailer" },
  { value: "FlatbedTruck", text: "Flatbed Truck" },
  { value: "LowboyTrailer", text: "Lowboy Trailer" },
  { value: "RefrigeratedTrailers", text: "Refrigerated Trailers" },
  { value: "MiniBus", text: "MiniBus" },
  { value: "Sedan", text: "Sedan" },
  { value: "Car", text: "Car" },
  { value: "SUV", text: "SUV" },
  { value: "Van", text: "Van" },
  { value: "Container", text: "Container" },
];

export const LOAD_UNIT = [
  { value: "Kg", text: "Kg" },
  { value: "Tons", text: "Tons" },
];
export const DOC_TYPE = [
  { value: "CompanyCertificate", text: "Certificate of InCoporation" },
  { value: "InsuranceCertificate", text: "Insurance or Bond Certificate" },
  { value: "Others", text: "Others" },
];

export const TRIP_STATUS = [
  { value: "NotAssigned", text: "Not Assigned" },
  { value: "Assigned", text: "Assigned" },
  { value: "Dispatched", text: "Dispatched" },
  { value: "PickedUp", text: "Picked Up Shipment" },
  { value: "Delivered", text: "Delivered Shipment" },
  { value: "Cancelled", text: "Cancelled Shipment" },
];
export const TRACK_SHIPMENT_STATUS = [
  { value: "NotAssigned", text: "Not Assigned" },
  { value: "Assigned", text: "Assigned" },
  { value: "Dispatched", text: "Dispatched Shipment" },
  { value: "SubmitForPickedUp", text: "Submit for Picked Up" },
  { value: "ConfirmPickedUp", text: "Confirm Picked Up" },
  { value: "Delivered", text: "Delivered Shipment" },
  { value: "ConfirmDelivered", text: "Confirmed Delivered Delivery" },
  { value: "Cancelled", text: "Cancelled Shipment" },
];
export const LOAD_CAPACITY = [
  { value: "LowCapacity", text: "Low Capacity 2000" },
  { value: "HeavyCapacity", text: "Heavy Capacity 25000" },
  { value: "HighCapacity", text: "High Capacity >24000" },
];

export const CARRIER_TYPE = [
  { value: "Air", text: "Air" },
  { value: "Sea", text: "Sea" },
  { value: "Road", text: "Road" },
];

export const FLEET_TYPE = [
  { value: "Vessel", text: "Vessel" },
  { value: "Truck", text: "Truck" },
  { value: "Plane", text: "Plane" },
];

export const PAYMENT_METHOD = [
  { value: "Cash", text: "Cash" },
  { value: "CreditCard", text: "Credit Card" },
  { value: "DebitCard", text: "Debit Card" },
  { value: "Paypal", text: "Paypal" },
  { value: "Stripe", text: "Stripe" },
  { value: "PayStack", text: "PayStack" },
];

export const ORDER_STATUS = [
  { value: "OrderMade", text: "Order Made" },
  { value: "Processed", text: "Processed" },
  { value: "Delivered", text: "Delivered" },
];

export const CARGO_TYPE = [
  { value: "RoRo", text: "RoRo" },
  { value: "Container", text: " Container " },
  { value: "LiquidBulk", text: "Liquid Bulk" },
  { value: "BreakBulk", text: "Break Bulk" },
  { value: "DryBulk", text: "Dry Bulk" },
];

export const SPECIALIZATION_TYPE = [
  { value: "carrier", text: "Carrier" },
  { value: "shipper", text: "Auction" },
  { value: "carrier", text: "Corp. Relocation" },
  { value: "auditor", text: "Auditor" },
  { value: "broker", text: "Rental Agency" },
  { value: "broker", text: "Broker" },
  { value: "shipper", text: "Salvage" },
  { value: "shipper", text: "Manufacturer" },
  { value: "shipper", text: "Import/Export" },
];

export const ROLES = [
  { value: "admin", text: "Administrator" },
  { value: "auditor", text: "Auditor" },
  { value: "carrier", text: "Carrier" },
  { value: "shipper", text: "Shipper" },
  { value: "driver", text: "driver " },
  { value: "broker", text: "Broker" },
];

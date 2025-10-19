function formatPrice(amount: number | null): string {
  switch (amount) {
    case null: {
      return "Бесценно";
    }
    case 1: {
      return `${amount} синапс`;
    }
    case 2:
    case 3:
    case 4: {
      return `${amount} синапса`;
    }
    default: {
      return `${amount} синапсов`;
    }
  }
}

export { formatPrice };

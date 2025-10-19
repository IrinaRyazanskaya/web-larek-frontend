class Modal {
  private modal: HTMLElement;
  protected modalContent: HTMLElement;
  private closeButton: HTMLElement | null;
  private onClose?: () => void;

  constructor() {
    this.modal = document.querySelector<HTMLElement>(".modal");
    this.modalContent = this.modal.querySelector<HTMLElement>(".modal__content");
    this.closeButton = this.modal.querySelector<HTMLButtonElement>(".modal__close");
    this.handleClose = this.handleClose.bind(this);
  }

  protected renderModal(onClose: () => void): HTMLElement {
    this.modalContent.innerHTML = "";
    this.modal.classList.add("modal_active");

    this.onClose = onClose;
    this.modal.addEventListener("click", this.handleClose);

    return this.modal;
  }

  close(): void {
    this.modal.classList.remove("modal_active");
    this.modal.removeEventListener("click", this.handleClose);
  }

  private handleClose(event: Event): void {
    if (event.target === this.modal || event.target === this.closeButton) {
      this.onClose?.();
    }
  }
}

export { Modal };

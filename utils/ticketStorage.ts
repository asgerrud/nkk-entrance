import { TICKET_STORAGE_KEY } from "@/types/constants";
import { PurchasedTicket } from "@/types/interfaces/PurchasedTicket";

export const getPurchasedTicketFromStorage = (): PurchasedTicket | null => {
  try {
    const savedTicket = localStorage.getItem(TICKET_STORAGE_KEY);
    if (!savedTicket) {
      return null;
    }

    const ticket: PurchasedTicket = JSON.parse(savedTicket);

    return ticket;
  } catch (error) {
    console.error("Failed to retrieve ticket from localStorage:", error);
    return null;
  }
};

export const saveTicketToStorage = (ticket: PurchasedTicket): void => {
  try {
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(ticket));
  } catch (error) {
    console.error("Failed to save ticket to localStorage:", error);
  }
};

export const clearSavedTicket = (): void => {
  try {
    localStorage.removeItem(TICKET_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear ticket from localStorage:", error);
  }
};

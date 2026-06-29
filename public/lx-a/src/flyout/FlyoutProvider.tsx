import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { defaultDealerId } from "../data/service";
import type { Vehicle } from "../data/vehicles";
import { seedBookings, type Booking } from "../data/bookings";
import { usePersistedState } from "../lib/usePersistedState";
import {
  personalDetails as initialPersonal,
  interests as initialInterests,
  paymentMethods as initialPayments,
  type DetailRow,
  type PaymentMethod,
} from "../data/profile";
import { BookServiceFlyout } from "./BookServiceFlyout";
import { ServiceHistoryFlyout } from "./ServiceHistoryFlyout";
import { PreferredDealerFlyout } from "./PreferredDealerFlyout";
import { EditPersonalDetailsFlyout } from "./EditPersonalDetailsFlyout";
import { ChangePasswordFlyout } from "./ChangePasswordFlyout";
import { EditInterestsFlyout } from "./EditInterestsFlyout";
import { PaymentMethodsFlyout } from "./PaymentMethodsFlyout";
import { AddVehicleFlyout } from "./AddVehicleFlyout";
import { EditRegistrationFlyout } from "./EditRegistrationFlyout";
import { ManualsFlyout } from "./ManualsFlyout";
import { ConnectFlyout } from "./ConnectFlyout";
import { ReferFriendFlyout } from "./ReferFriendFlyout";
import { DriveCareFlyout } from "./DriveCareFlyout";
import { LoanCarFlyout } from "./LoanCarFlyout";
import { EncoreInfoFlyout } from "./EncoreInfoFlyout";
import { UpcomingFlyout } from "./UpcomingFlyout";
import { SettingsFlyout } from "./SettingsFlyout";
import { BuildPriceFlyout } from "./BuildPriceFlyout";
import { seedWishlist, type WishlistVehicle } from "../data/configurator";

export type FlyoutKind =
  | "book-service"
  | "service-history"
  | "preferred-dealer"
  | "edit-personal"
  | "change-password"
  | "edit-interests"
  | "payment-methods"
  | "add-vehicle"
  | "edit-registration"
  | "manuals"
  | "connect"
  | "refer-friend"
  | "drivecare"
  | "loan-car"
  | "encore-info"
  | "concierge"
  | "upcoming"
  | "settings"
  | "build-price";

interface Payload {
  vehicleName?: string;
  vehicleId?: string;
  rego?: string;
  smart?: boolean;
  preferredDealerId?: string;
  returnTo?: FlyoutKind;
}

interface FlyoutContextValue {
  open: (kind: FlyoutKind, payload?: Payload) => void;
  close: () => void;
  back: () => void;
  /** Currently open flyout kind, or null when nothing is open. */
  activeKind: FlyoutKind | null;
  isAnyOpen: boolean;
  payload: Payload;
  preferredDealerId: string;
  setPreferredDealerId: (id: string) => void;
  // Editable profile state
  personal: DetailRow[];
  setPersonal: (rows: DetailRow[]) => void;
  interests: string[];
  setInterests: (tags: string[]) => void;
  payments: PaymentMethod[];
  setPayments: (methods: PaymentMethod[]) => void;
  // Per-vehicle registration overrides (keyed by vehicle id)
  regoOverrides: Record<string, string>;
  setRego: (vehicleId: string, rego: string) => void;
  // Pending (newly added) vehicles awaiting verification
  pendingVehicles: Vehicle[];
  addPendingVehicle: (vehicle: Vehicle) => void;
  // Upcoming bookings (service / valet / lounge)
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  // Wishlist — saved Build & Price configurations (limited account)
  wishlist: WishlistVehicle[];
  addToWishlist: (vehicle: WishlistVehicle) => void;
  removeFromWishlist: (id: string) => void;
}

const FlyoutContext = createContext<FlyoutContextValue | null>(null);

export function useFlyout() {
  const ctx = useContext(FlyoutContext);
  if (!ctx) throw new Error("useFlyout must be used within FlyoutProvider");
  return ctx;
}

export function FlyoutProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<FlyoutKind | null>(null);
  const [payload, setPayload] = useState<Payload>({});
  const [openState, setOpenState] = useState(false);
  const [preferredDealerId, setPreferredDealerId] = useState(defaultDealerId);
  const [personal, setPersonal] = useState<DetailRow[]>(initialPersonal);
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [payments, setPayments] = useState<PaymentMethod[]>(initialPayments);
  const [regoOverrides, setRegoOverrides] = useState<Record<string, string>>(
    {}
  );
  const [pendingVehicles, setPendingVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = usePersistedState<Booking[]>(
    "lexus.bookings",
    seedBookings
  );
  const [wishlist, setWishlist] = usePersistedState<WishlistVehicle[]>(
    // Bumped key so the demo seed applies even where an earlier empty wishlist
    // was already persisted under the old key.
    "lexus.wishlist.v2",
    seedWishlist
  );
  const timer = useRef<number | undefined>(undefined);

  const addToWishlist = (vehicle: WishlistVehicle) =>
    setWishlist((prev) => [...prev, vehicle]);
  const removeFromWishlist = (id: string) =>
    setWishlist((prev) => prev.filter((v) => v.id !== id));

  const addPendingVehicle = (vehicle: Vehicle) =>
    setPendingVehicles((prev) => [...prev, vehicle]);
  const addBooking = (booking: Booking) =>
    setBookings((prev) =>
      [...prev.filter((b) => b.id !== booking.id), booking].sort(
        (a, b) => a.at - b.at
      )
    );
  const removeBooking = (id: string) =>
    setBookings((prev) => prev.filter((b) => b.id !== id));

  const setRego = (vehicleId: string, rego: string) =>
    setRegoOverrides((prev) => ({ ...prev, [vehicleId]: rego }));

  const open = (k: FlyoutKind, p: Payload = {}) => {
    window.clearTimeout(timer.current);
    setKind(k);
    setPayload(p);
    setOpenState(true);
  };
  const close = () => {
    setOpenState(false);
    // clear kind after the exit animation so flyout content state resets
    timer.current = window.setTimeout(() => setKind(null), 340);
  };
  const back = () => {
    if (payload.returnTo) open(payload.returnTo, {});
    else close();
  };

  const value: FlyoutContextValue = {
    open,
    close,
    back,
    activeKind: openState ? kind : null,
    isAnyOpen: openState,
    payload,
    preferredDealerId,
    setPreferredDealerId,
    personal,
    setPersonal,
    interests,
    setInterests,
    payments,
    setPayments,
    regoOverrides,
    setRego,
    pendingVehicles,
    addPendingVehicle,
    bookings,
    addBooking,
    removeBooking,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <FlyoutContext.Provider value={value}>
      {children}
      {kind === "book-service" && <BookServiceFlyout open={openState} />}
      {kind === "service-history" && <ServiceHistoryFlyout open={openState} />}
      {kind === "preferred-dealer" && <PreferredDealerFlyout open={openState} />}
      {kind === "edit-personal" && <EditPersonalDetailsFlyout open={openState} />}
      {kind === "change-password" && <ChangePasswordFlyout open={openState} />}
      {kind === "edit-interests" && <EditInterestsFlyout open={openState} />}
      {kind === "payment-methods" && <PaymentMethodsFlyout open={openState} />}
      {kind === "add-vehicle" && <AddVehicleFlyout open={openState} />}
      {kind === "edit-registration" && (
        <EditRegistrationFlyout open={openState} />
      )}
      {kind === "manuals" && <ManualsFlyout open={openState} />}
      {kind === "connect" && <ConnectFlyout open={openState} />}
      {kind === "refer-friend" && <ReferFriendFlyout open={openState} />}
      {kind === "drivecare" && <DriveCareFlyout open={openState} />}
      {kind === "loan-car" && <LoanCarFlyout open={openState} />}
      {kind === "encore-info" && <EncoreInfoFlyout open={openState} />}
      {/* The "concierge" kind drives the Lexus Concierge panel, rendered by App
          so it can reach app-level navigation. See AgentPanel. */}
      {kind === "upcoming" && <UpcomingFlyout open={openState} />}
      {kind === "settings" && <SettingsFlyout open={openState} />}
      {kind === "build-price" && <BuildPriceFlyout open={openState} />}
    </FlyoutContext.Provider>
  );
}

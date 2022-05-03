import { Countdown } from './components/Countdown'
import { SoldOut } from './components/SoldOut'
import { AllowlistCheck } from './components/AllowlistCheck'
import { AllowlistCheckSimple } from './components/AllowlistCheckSimple'
import { ConnectWallet } from './components/ConnectWallet'
import { ConnectWalletSimple } from './components/ConnectWalletSimple'
import { Gallery } from './components/Gallery'
import { GalleryThumbnail } from './components/Gallery/GalleryThumbnail'
import { MintButton } from './components/MintButton'
import { DropInfo } from './components/DropInfo'
import { ActiveMint } from './components/ActiveMint'
import { CountdownSimple } from './components/CountdownSimple'
import { SupplyCounter } from "./components/DropInfo/SupplyCounter"
import { MintPrice } from "./components/DropInfo/MintPrice"
import { PresaleMintPrice } from "./components/DropInfo/PresaleMintPrice"
import { TransactionLimit } from "./components/DropInfo/TransactionLimit"

export { useDrops } from './provider'

export const DropComponents = {
  Gallery,
  Countdown,
  SoldOut,
  AllowlistCheck,
  AllowlistCheckSimple,
  ConnectWallet,
  MintButton,
  DropInfo,
  ActiveMint,
  CountdownSimple,
  SupplyCounter,
  MintPrice,
  PresaleMintPrice,
  TransactionLimit,
  GalleryThumbnail,
  ConnectWalletSimple,
}

import { BigInt } from "@graphprotocol/graph-ts"
import {
  Pseudopops,
  Approval,
  ApprovalForAll,
  NameChanged,
  OwnershipTransferred,
  SodaPoured,
  Transfer
} from "../generated/Pseudopops/Pseudopops"

import { Soda, Collection } from "../generated/schema";

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Soda.load(event.transaction.from.toHex())
  if (!entity) return;

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  entity.owner = event.params.owner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.NAMECHANGEPRICE(...)
  // - contract.SHAKEITUPPRICE(...)
  // - contract.appsus(...)
  // - contract.balanceOf(...)
  // - contract.bottleCaps(...)
  // - contract.burn(...)
  // - contract.cache(...)
  // - contract.getApproved(...)
  // - contract.gremblo(...)
  // - contract.isApprovedForAll(...)
  // - contract.isNameReserved(...)
  // - contract.maxPerTx(...)
  // - contract.maxSupply(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.priceToMint(...)
  // - contract.sodaCount(...)
  // - contract.sodas(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.toLower(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenNameByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {
}

export function handleNameChanged(event: NameChanged): void {
  let soda = Soda.load(event.transaction.from.toHex())
  if (!soda) return;

  soda.name = event.params.newName;
  soda.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let soda = Soda.load(event.transaction.from.toHex())
  if (!soda) return;
  soda.owner = event.transaction.from;
  soda.poured = event.block.timestamp;
  soda.lastPoured = soda.poured;
  soda.save();
}

export function handleSodaPoured(event: SodaPoured): void {
  let soda = Soda.load(event.transaction.from.toHex())
  if (!soda) return;
  soda.owner = event.transaction.from;
  soda.tokenId = event.params.tokenId;
  soda.poured = event.block.timestamp;
  soda.lastPoured = soda.poured;
  soda.save();
}

export function handleTransfer(event: Transfer): void {
  let soda = Soda.load(event.transaction.from.toHex())
  if (!soda) return;
  soda.owner = event.params.to;
  soda.tokenId = event.params.tokenId;
  soda.poured = event.block.timestamp;
  soda.lastPoured = soda.poured;
  soda.save();
}

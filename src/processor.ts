import {
  EventHandlerContext,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { TreasuryDeposit } from "./model";
import { TreasuryDepositEvent } from "./types/events";

const processor = new SubstrateProcessor("moonriver-treasury-deposits");

processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive("moonriver")[0].url,
  chain: "wss://moonriver.api.onfinality.io/public-ws",
});
processor.setBlockRange({from: 1935610, to: 2299969})

processor.addEventHandler("treasury.Deposit", async (ctx: EventHandlerContext) => {
  const event = getDepositEvent(ctx);

  const deposit = new TreasuryDeposit();
  deposit.id = ctx.event.id;
  deposit.balance = event.value;
  deposit.timestamp = new Date(ctx.event.blockTimestamp).toUTCString();

  await ctx.store.save(deposit);
});

function getDepositEvent(ctx: EventHandlerContext) {
  const event = new TreasuryDepositEvent(ctx);

  if (event.isV900) {
    const deposit = event.asV900;
    return { value: deposit };
  } else {
    return event.asV1300
  }
}

processor.run();

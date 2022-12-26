import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GreetingAnchor } from "../target/types/greeting_anchor";

describe("greeting-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.GreetingAnchor as Program<GreetingAnchor>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});

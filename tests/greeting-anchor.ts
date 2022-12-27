import * as anchor from "@project-serum/anchor";
import { AccountNamespace, Program } from "@project-serum/anchor";
import { assert } from "chai";
import { GreetingAnchor, IDL } from "../target/types/greeting_anchor";

describe("greeting-anchor", () => {
  const provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program: Program<GreetingAnchor> = anchor.workspace.GreetingAnchor;

  it("should execute the function call without any issues", async () => {
    const greetingAccount = anchor.web3.Keypair.generate();

    await program.methods
      .setMessage("Hello World")
      .accounts({
        greetingAccount: greetingAccount.publicKey,
        user: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([greetingAccount])
      .rpc({
        commitment: "confirmed",
      });

    const { greeting } = await program.account.greetingAccount.fetch(
      greetingAccount.publicKey
    );

    assert(greeting === "Hello World", "Error Unexpected message");
  });
});

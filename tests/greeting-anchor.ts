import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GreetingAnchor, IDL } from "../target/types/greeting_anchor";

describe("greeting-anchor", () => {
  const provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program: Program<GreetingAnchor> = anchor.workspace.GreetingAnchor;

  it("should execute the function call without any issues", async () => {
    const greetingAccount = anchor.web3.Keypair.generate();

    const tx = await program.rpc.setMessage("Hello World", {
      accounts: {
        greeting: greetingAccount.publicKey,
        user: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      options: {
        commitment: "confirmed",
      },
      signers: [greetingAccount],
    });
  });
});

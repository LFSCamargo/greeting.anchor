use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod greeting_anchor {
  use super::*;

  pub fn set_message(ctx: Context<SetMessage>, message: String) -> Result<()> {
    let greeting_account = &mut ctx.accounts.greeting_account;
    greeting_account.greeting = message;
    msg!("Greeting updated, {}", greeting_account.greeting);
    Ok(())
  }
}

#[account]
pub struct GreetingAccount {
  pub greeting: String,
}

#[derive(Accounts)]
pub struct SetMessage<'info> {
  #[account(init, payer = user, space = 8 + 32)]
  greeting_account: Account<'info, GreetingAccount>,

  #[account(mut)]
  pub user: Signer<'info>,

  pub system_program: Program<'info, System>,
}

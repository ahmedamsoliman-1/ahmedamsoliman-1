# Install dependencies
brew install openssl readline sqlite3 xz zlib

# Install pyenv
brew install pyenv

# Add pyenv to your shell profile
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

# Restart your shell or reload your profile
exec "$SHELL"

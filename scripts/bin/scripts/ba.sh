

systemctl --user list-units --type=service --state=running

systemctl --user status kub_pf.service

systemctl --user restart kub_pf.service

journalctl --user -u kub_pf.service

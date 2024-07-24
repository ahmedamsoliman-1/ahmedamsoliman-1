from utils import run_command, StreamLogger
from namespaces import namespaces
import sys

stream_logger = StreamLogger()


def seperater(namespace):
    stream_logger.stream_logger.warning('*******************************************************************')
    stream_logger.stream_logger.warning('               ' + namespace)
    stream_logger.stream_logger.warning('*******************************************************************')


def logs(namespace):

    svcs_paperless = [
        'gotenberg',
        'paperless-ngx',
        'postgresql',
        'redis',
        'tika'
    ]

    svc_overleaf = [
        'overleaf'
    ]

    default = [
        'kubernetes'
    ]

    if namespace == 'paperless':
        for svc in svcs_paperless:
            run_command(f'kubectl -n {namespace} logs svc/{svc}')
        return
    if namespace == 'overleaf':
        for svc in svc_overleaf:
            run_command(f'kubectl -n {namespace} logs svc/{svc}')
        return

    else: 
        for svc in default:
            run_command(f'kubectl -n {namespace} logs svc/{svc}')

    # for svc in svc_overleaf:
    #     run_command(f'kubectl -n {namespace} logs svc/{svc}')

    
    

def main():
    argv = sys.argv
    namespace = argv[1]
    stream_logger.stream_logger.critical(f'Using name space {namespace}')
    logs(namespace)


if __name__ == "__main__":
    main()

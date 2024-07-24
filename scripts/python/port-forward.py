from utils import run_command, StreamLogger

stream_logger = StreamLogger()





namespaces = [
    'default', 
    'monitoring', 
    'kubernetes-dashboard', 
    'ingress-nginx',
    'training-ui',
    'root-app'
]

def port_forward():
    run_command('kind get clusters')
    run_command('kubectl get nodes')
    run_command('kubectl get namespaces')

    namespace = 'ingress-nginx'

 
    stream_logger.stream_logger.critical('************************************************************************************************')
    stream_logger.stream_logger.critical('Namespace: ' + namespace)
    stream_logger.stream_logger.critical('************************************************************************************************')
    
    run_command(f'kubectl -n {namespace} get configmap')
    run_command(f'kubectl -n {namespace} get secrets')
    run_command(f'kubectl -n {namespace} get serviceaccounts')
    run_command(f'kubectl -n {namespace} get pods')
    run_command(f'kubectl -n {namespace} get deploy')
    run_command(f'kubectl -n {namespace} get svc')


    run_command('sudo kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 443')




def main():
    port_forward()

if __name__ == "__main__":
    main()

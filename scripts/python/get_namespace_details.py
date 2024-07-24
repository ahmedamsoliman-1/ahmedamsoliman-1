from utils import run_command, StreamLogger
from namespaces import namespaces
import sys

stream_logger = StreamLogger()


def seperater(namespace):
    stream_logger.stream_logger.warning('*******************************************************************')
    stream_logger.stream_logger.warning('               ' + namespace)
    stream_logger.stream_logger.warning('*******************************************************************')


def namespace_info(namespace):

    k8s = [
        'events',
        'pvc', 
        'configmap', 
        'serviceaccounts',
        'deployments',
        'statefulset',
        'daemonsets',
        'ingress',
        'pods',
        'services',
    ]

    k8s_all = [
        'events',
        'persistentvolumeClaims',
        'cronjobs',
        'daemonsets',
        'statefulsets',
        'serviceaccounts',
        'networkpolicies',
        'configmaps',
        'secrets',
        'jobs',
        'ingress',
        'replicasets',
        'replicationcontrollers',
        
        'deployments',
        'services',
        'pods',
    ]


    run_command(f'kubectl get ns')
    run_command(f'kubectl get pv')
    run_command(f'kubectl get storageclass')
    run_command(f'kubectl get clusterroles')
    run_command(f'kubectl get clusterrolebindings')
    run_command(f'kubectl get rolebindings')
    if namespace == 'all':
        for ns in namespaces:
            seperater(ns)
            for k8 in k8s_all:
                run_command(f'kubectl -n {ns} get {k8}')   
    else:
        stream_logger.stream_logger.critical(f'Using name space {namespace}')
        seperater(namespace)
        for k8 in k8s_all:
            run_command(f'kubectl -n {namespace} get {k8}')
    

def main():
    argv = sys.argv
    namespace = argv[1]
    namespace_info(namespace)


if __name__ == "__main__":
    main()

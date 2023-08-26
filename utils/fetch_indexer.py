from datetime import datetime
import json
from webbrowser import get
import pip._vendor.requests

def convert(number,points):
    decimal = pow(10,points) # power function
    return number / decimal

def fetchApp(pool_address, a1_deci, a2_deci, roundz):
    appl_token = []
    application_list = []                            
    session = pip._vendor.requests.Session()
    url = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?max-round=' + f'19619692' + '&tx-type=appl' 
    app_tx = session.get(url = url, headers={'Connection':'close'})
    get_app = json.loads(app_tx.text)
    for p in get_app['transactions']:
        appl_dict = {}
        if 'c3dhcA==' in p['application-transaction']['application-args']:
            appl_dict.update({'type': 'swap'})
            appl_dict.update({'time': p['round-time']})
            appl_dict.update({'timestamp': str(datetime.utcfromtimestamp(p['round-time']).replace(tzinfo=None))})
            appl_dict.update({'intra': p['intra-round-offset']})
            appl_dict.update({'address': p['application-transaction']['accounts'][0]})
            for delta in p['local-state-delta']:
                if delta['address'] == pool_address:
                    for liquid in delta['delta']:
                        if liquid['key'] == "czE=":
                            appl_dict.update({'liquid1': convert(liquid['value']['uint'], a1_deci)})
                        if liquid['key'] == "czI=":
                            appl_dict.update({'liquid2': convert(liquid['value']['uint'], a2_deci)})
            application_list.append([p['group'], p['confirmed-round'], appl_dict])

    if 'next-token' in get_app.keys():                   
        appl_token.append(get_app["next-token"])     
        while appl_token != False:
            if bool(appl_token) is False:
                break               
            else:                 
                for z in appl_token: 
                    if not z:
                        break
                    else:
                        appppl_url = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?max-round=' + f'19619692'  + '&tx-type=appl&next=' + z
                        grouppp_tx = session.get(url = appppl_url, headers={'Connection':'close'})
                        obtainnn_group = json.loads(grouppp_tx.text)
                        if 'next-token' in obtainnn_group.keys():
                            appl_token.append(obtainnn_group["next-token"])
                            appl_token.remove(z)      
                        else:
                            appl_token.clear()
                        for ppp in obtainnn_group['transactions']:
                            appl_dict2 = {}
                            if 'c3dhcA==' in ppp['application-transaction']['application-args']:                                  
                                appl_dict2.update({'type': 'swap'})
                                appl_dict2.update({'time': ppp['round-time']})
                                appl_dict2.update({'timestamp': str(datetime.utcfromtimestamp(ppp['round-time']).replace(tzinfo=None))})
                                appl_dict2.update({'intra': ppp['intra-round-offset']})
                                appl_dict2.update({'address': ppp['application-transaction']['accounts'][0]})
                                for deltaa in ppp['local-state-delta']:
                                    if deltaa['address'] == pool_address:
                                        for liquidd in deltaa['delta']:
                                            if liquidd['key'] == "czE=":
                                                appl_dict2.update({'liquid1': convert(liquidd['value']['uint'], a1_deci)})
                                            if liquidd['key'] == "czI=":
                                                appl_dict2.update({'liquid2': convert(liquidd['value']['uint'], a2_deci)})
                                application_list.append([ppp['group'], ppp['confirmed-round'], appl_dict2])
    return application_list

def assetTwo(pool_address, a1_id, a1_deci, roundz):
    axf_token = []
    ax_list = []                            
    session = pip._vendor.requests.Session()
    url = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?asset-id=' + a1_id + '&max-round=' + f'19619692'  + '&tx-type=axfer' 
    app_tx = session.get(url = url, headers={'Connection':'close'})
    get_app = json.loads(app_tx.text)
    for j in get_app['transactions']:
        ax_dict = {}
        if 'group' in j:
            ax_dict.update({'amount_1': convert(j['asset-transfer-transaction']['amount'], a1_deci)})
            if j['asset-transfer-transaction']['receiver'] == pool_address:
                ax_dict.update({'tx_type': 'sell'})
            else:
                ax_dict.update({'tx_type': 'buy'})
            ax_list.append([j['group'], ax_dict])

    if 'next-token' in get_app.keys():
        axf_token.append(get_app["next-token"])         
        while axf_token != False:
            if bool(axf_token) is False:
                break               
            else: 
                for zz in axf_token:
                    if not zz:
                        break
                    else:
                        url111 = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?asset-id=' + a1_id + '&max-round=' + f'19619692' + '&tx-type=axfer&next=' + zz
                        obtener_pools_111 = session.get(url = url111, headers={'Connection':'close'})
                        obtener_pools_p2_111 = json.loads(obtener_pools_111.text)
                        if 'next-token' in obtener_pools_p2_111.keys():
                            axf_token.append(obtener_pools_p2_111["next-token"])
                            axf_token.remove(zz)
                        else:
                            axf_token.clear()
                        for jjj in obtener_pools_p2_111['transactions']:
                            ax_dict2 = {}
                            if 'group' in jjj:
                                ax_dict2.update({'amount_1': convert(jjj['asset-transfer-transaction']['amount'], a1_deci)})
                                if jjj['asset-transfer-transaction']['receiver'] == pool_address:
                                    ax_dict2.update({'tx_type': 'sell'})
                                else:
                                    ax_dict2.update({'tx_type': 'buy'})
                                ax_list.append([jjj['group'], ax_dict2])                
    return ax_list

def assetThree(pool_address, a1_id, a2_deci, roundz):
    pay_token = []
    p_list = []                            
    session = pip._vendor.requests.Session()
    if int(a1_id) == 0:
        url = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?currency-greater-than=2000&max-round=' + f'19619692'  + '&tx-type=pay'
    else:
        url = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?asset-id=' + a1_id + '&max-round=' + f'19619692'  + '&tx-type=axfer' 
    app_tx = session.get(url = url, headers={'Connection':'close'})
    get_app = json.loads(app_tx.text)
    for i in get_app['transactions']:
        pay_dict = {}
        if 'group' in i:
            if int(a1_id) == 0:
                pay_dict.update({'amount_2': convert(i['payment-transaction']['amount'], a2_deci)})
                if i['payment-transaction']['receiver'] == pool_address:
                    pay_dict.update({'tx_type1': 'sell'})
                else:
                    pay_dict.update({'tx_type1': 'buy'})
            else:
                pay_dict.update({'amount_2': convert(i['asset-transfer-transaction']['amount'], a2_deci)})
                if i['asset-transfer-transaction']['receiver'] == pool_address:
                    pay_dict.update({'tx_type1': 'sell'})
                else:
                    pay_dict.update({'tx_type1': 'buy'})                
            p_list.append([i['group'], pay_dict])

    if 'next-token' in get_app.keys():
        pay_token.append(get_app["next-token"])
        while pay_token != False:
            if bool(pay_token) is False:
                break               
            else:                 
                for zzz in pay_token:
                    if not zzz:
                        break
                    else:
                        if int(a1_id) == 0:
                            urlll = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?currency-greater-than=2000&max-round=' + f'19619692' + '&tx-type=pay&next=' + zzz
                        else:
                            urlll = 'https://mainnet-idx.algonode.cloud/v2/accounts/' + pool_address + '/transactions?asset-id=' + a1_id + '&max-round=' + f'19619692' + '&tx-type=axfer&next=' + zzz
                        obtener_poolsss = session.get(url = urlll, headers={'Connection':'close'})
                        obtener_pools_p222 = json.loads(obtener_poolsss.text)   
                        if 'next-token' in obtener_pools_p222.keys():
                            pay_token.append(obtener_pools_p222["next-token"])  
                            pay_token.remove(zzz)
                        else:
                            pay_token.clear()
                        for jjjj in obtener_pools_p222['transactions']:
                            pay_dict2 = {}
                            if 'group' in jjjj:
                                if int(a1_id) == 0:
                                    pay_dict2.update({'amount_2': convert(jjjj['payment-transaction']['amount'], a2_deci)})
                                    if jjjj['payment-transaction']['receiver'] == pool_address:
                                        pay_dict2.update({'tx_type1': 'sell'})
                                    else:
                                        pay_dict2.update({'tx_type1': 'buy'})
                                else:
                                    pay_dict2.update({'amount_2': convert(jjjj['asset-transfer-transaction']['amount'], a2_deci)})
                                    if jjjj['asset-transfer-transaction']['receiver'] == pool_address:
                                        pay_dict2.update({'tx_type1': 'sell'})
                                    else:
                                        pay_dict2.update({'tx_type1': 'buy'})                
                                p_list.append([jjjj['group'], pay_dict2])
    return p_list


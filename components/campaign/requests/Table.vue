<template>
    <sui-table celled>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>ID</sui-table-header-cell>
                    <sui-table-header-cell>Description</sui-table-header-cell>
                    <sui-table-header-cell>Amount(Ether)</sui-table-header-cell>
                    <sui-table-header-cell>Recepient</sui-table-header-cell>
                    <sui-table-header-cell>Approval Count</sui-table-header-cell>
                    <sui-table-header-cell>Approve</sui-table-header-cell>
                    <sui-table-header-cell>Finalize</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="(request,index) in value" :key="index">
                    <sui-table-cell>{{ index+1 }}</sui-table-cell>
                    <sui-table-cell>{{ request.description }}</sui-table-cell>
                    <sui-table-cell>{{ request.value }}</sui-table-cell>
                    <sui-table-cell>{{ request.recipient }}</sui-table-cell>
                    <sui-table-cell>{{ request.approvalsCount }}/ {{ approversCount }}</sui-table-cell>
                    <sui-table-cell positive>Approve</sui-table-cell>
                    <sui-table-cell negative>Finalize</sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>
</template>

<script>

export default {
  name: 'campaignRequestTable',
  props: ['value','approversCount']
}
</script>

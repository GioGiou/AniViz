<script>
    import { onMount } from "svelte"
    import PapaParse from 'papaparse';

    import { base } from '$app/paths'
	import * as d3 from "d3"
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
    import fs from 'fs';
    /**@type String*/
    let data;
    /**@type any*/
    let handler;
    let rows;
    let dataT;
    onMount(async ()=>{
        const rez = await fetch("/animes.csv");
        data  = await rez.text();
        dataT= PapaParse.parse(data,{header:true});
    });
</script>
<!-- svelte-ignore event_directive_deprecated -->




        


===================================== capture.tpl =============================================================
{include file='capture.tpl'}-
===============================================================================================================
===================================== strip.tpl =============================================================
{include file='strip.tpl'}-
===============================================================================================================
===================================== for.tpl =============================================================
{include file='for.tpl' assign='zzz'}-
[{$zzz}]
===============================================================================================================
===================================== var.tpl =============================================================
{include file='var.tpl' zzz='assign_zzz'}-
[{$zzz}]

{include file='var.tpl' foo='outer_value'}-

===============================================================================================================
===================================== if.tpl =============================================================
{$fnm = 'if.tpl'}
{include file=$fnm}-
===============================================================================================================
===================================== if.tpl =============================================================
{$fnm = 'if.tpl'}
{include file="$fnm"}-
===============================================================================================================
========================================included.tpl=======================================================================
{$assignTo = included}
{include file='included.tpl' assign=$assignTo cache_lifetime=100  compile_id=10000  cache_id=10000  scope=root  nocache  caching}-
{$assignTo}

{include 'included.tpl' inline}-
===============================================================================================================
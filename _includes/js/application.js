// Generated by CoffeeScript 1.4.0
(function(){var e,t={}.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e},r=function(e,t){return function(){return e.apply(t,arguments)}};window.Application={Models:{},Collections:{},Views:{},router:{},url:"{{ site.url }}",name:"{{ site.name }}",disqus:{name:"{{ site.disqus.shortname }}",api_key:"{{ site.disqus.api_key }}",count:"{{ site.disqus.count }}"},twitter:{count:"{{ site.twitter.count }}",username:"{{ site.twitter.username }}"}},Application.Models.Post=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.url=function(){return Application.url+"/"+this.id+".json"},t.prototype.defaults={author:"Benjamin J. Balter",title:"",url:"",content:"",tags:[],category:"",date:""},t}(Backbone.Model),Application.Models.Page=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.url=function(){return Application.url+"/"+this.id+".json"},t}(Backbone.Model),Application.Models.Thread=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.url=function(){var e;return e="https://disqus.com/api/3.0/threads/details.json?",e+="thread="+this.id,e+="&api_key="+Application.disqus.api_key,e+="&callback=?",e},t.prototype.parse=function(e){return e.response},t}(Backbone.Model),Application.Models.Comment=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.initialize=function(){var e=this;return this.set("thread",new Application.Models.Thread({id:this.get("thread")})),this.get("thread").fetch({success:function(){return e.collection.trigger("change")}})},t}(Backbone.Model),Application.Models.Tweet=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t}(Backbone.Model),Application.Collections.Comments=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.model=Application.Models.Comment,t.prototype.url=function(){var e;return e="https://disqus.com/api/3.0/posts/list.json?",e+="forum="+Application.disqus.name,e+="&limit="+Application.disqus.count,e+="&api_key="+Application.disqus.api_key,e+="&callback=?",e},t.prototype.parse=function(e){return e.response},t}(Backbone.Collection),Application.Collections.Tweets=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.model=Application.Models.Tweet,t.prototype.url=function(){var e;return e="https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true",e+="&screen_name="+Application.twitter.username,e+="&count="+Application.twitter.count,e+="&callback=?",e},t}(Backbone.Collection),Application.Collections.Posts=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.model=Application.Models.Post,t.prototype.url=function(){return Application.url+"/"+"posts.json"},t.prototype.comparator=function(e,t){var n;return e=e.get("date"),t=t.get("date"),e===t?n=1:e>t?n=-1:e<t&&(n=1),n},t}(Backbone.Collection),Application.Collections.Pages=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.model=Application.Models.Page,t.prototype.url=function(){return Application.url+"/"+"pages.json"},t}(Backbone.Collection),Application.Views.Post=function(e){function t(){return this.render=r(this.render,this),t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el="#main",t.prototype.tagName="article",t.prototype["class"]="post",t.prototype.template=$("#post_template").html(),t.prototype.render=function(){var e;e=_.template(this.template),this.$el.append(e(this.model.toJSON()));if(this.model.get("comments"))return this.loadDisqus()},t.prototype.loadDisqus=function(){var e;return window.disqus_shortname=Application.disqus.name,window.disqus_identifier=this.model.get("id"),window.disqus_url=Application.url+"/"+this.model.get("id"),window.disqus_title=this.model.get("title")+" » "+Application.name,typeof DISQUS!="undefined"&&DISQUS!==null?DISQUS.reset({reload:!0,config:function(){return this.page.identifier=disqus_identifier,this.page.url=disqus_url,this.page.title=disqus_title}}):(e=document.createElement("script"),e.type="text/javascript",e.async=!0,e.src="http://"+disqus_shortname+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e))},t}(Backbone.View),Application.Views.PostExcerpt=function(e){function t(){return this.render=r(this.render,this),t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el=".posts",t.prototype.tagName="article",t.prototype["class"]="post",t.prototype.template=$("#post_excerpt_template").html(),t.prototype.initialize=function(){return this.model.on("change",this.render)},t.prototype.render=function(){var e,t;return e=_.template(this.template),t=this.getExcerpted(),this.$el.append(e(t.toJSON()))},t.prototype.getExcerpted=function(){var e;return e=this.model.clone(),e.set("content",this.model.get("content").split("<!-- more -->")[0]),e},t}(Backbone.View),Application.Views.Page=function(e){function t(){return this.render=r(this.render,this),t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el="#main",t.prototype.tagName="article",t.prototype["class"]="page",t.prototype.template=$("#page_template").html(),t.prototype.render=function(){var e;e=_.template(this.template),this.$el.html(e(this.model.toJSON()));if(typeof DISQUS!="undefined"&&DISQUS!==null)return DISQUS.reset()},t}(Backbone.View),Application.Views.Single=function(e){function t(){return this.render=r(this.render,this),t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el="#content",t.prototype.template=$("#single_layout").html(),t.prototype.initialize=function(){return this.model.on("change",this.render)},t.prototype.render=function(){var e,t;return e=_.template(this.template),this.$el.html(e(this.model.toJSON())),this.model.get("layout")==="post"?t=new Application.Views.Post({model:this.model}):this.model.get("layout")==="page"&&(t=new Application.Views.Page({model:this.model})),document.title=this.model.get("title")+" » "+Application.name,t.render()},t}(Backbone.View),Application.Views.Index=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el="#content",t.prototype.template=$("#index_layout").html(),t.prototype.render=function(){var e,t,n;return this.$el.html(this.template),this.collection.sort(),this.collection.slice(0,10).forEach(function(e){var t;return e.fetch(),t=new Application.Views.PostExcerpt({model:e})}),e=new Application.Collections.Comments,n=new Application.Views.CommentView({collection:e}),e.fetch(),t=new Application.Collections.Tweets,n=new Application.Views.TweetView({collection:t}),t.fetch()},t}(Backbone.View),Application.Views.CommentView=function(e){function t(){return this.render=r(this.render,this),this.initialize=r(this.initialize,this),t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el="#recentcomments",t.prototype.template=$("#recent_comments_template").html(),t.prototype.initialize=function(){return this.collection.on("change",this.render)},t.prototype.render=function(){var e;return e=_.template(this.template),this.$el.html(e({comments:this.collection.toJSON()}))},t}(Backbone.View),Application.Views.TweetView=function(e){function t(){return this.render=r(this.render,this),this.initialize=r(this.initialize,this),t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.el="#tweets",t.prototype.template=$("#recent_tweets_template").html(),t.prototype.initialize=function(){return this.collection.on("all",this.render)},t.prototype.render=function(){var e;return e=_.template(this.template),this.$el.html(e({tweets:this.collection.toJSON()}))},t}(Backbone.View),e=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.routes={":year/:month/:day/:slug/":"post",":slug/":"page","":"index"},t.prototype.post=function(e,t,n,r){var i,s;return i=new Application.Models.Post({id:e+"/"+t+"/"+n+"/"+r}),Application.posts.add(i),s=new Application.Views.Single({model:i}),i.fetch({error:this.redirect}),this.setNav("")},t.prototype.page=function(e){var t,n;return t=new Application.Models.Page({id:e}),Application.pages.add(t),n=new Application.Views.Single({model:t}),t.fetch({error:this.redirect}),this.setNav(e.replace("/",""))},t.prototype.index=function(){var e;return e=new Application.Views.Index({collection:Application.posts}),Application.posts.fetch({error:this.redirect,success:function(){return e.render()}}),this.setNav("home")},t.prototype.redirect=function(){return document.location=Application.url+"/"+Backbone.history.fragment},t.prototype.setNav=function(e){return $(".nav .active").removeClass("active"),$(".nav #"+e).addClass("active")},t}(Backbone.Router),Application.posts=new Application.Collections.Posts,Application.pages=new Application.Collections.Pages,Application.router=new e,Backbone.history.start({pushState:!0,silent:!0}),jQuery(document).ready(function(){return $('a[href^="{{ site.url }}/"]').live("click",function(e){return e.preventDefault(),Application.router.navigate($(this).attr("href").replace("{{ site.url }}/",""),!0)}),!1,window.resume_resize=function(){return $(".page-resume .bar").height($(".content").height()-25)},$(window).resize(resume_resize),resume_resize()})}).call(this);
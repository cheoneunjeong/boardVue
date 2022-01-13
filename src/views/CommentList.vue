 <template>
  <div>
    <v-card
        class="mx-auto"
        max-width="100%"
    >
        <v-list-item>
        <v-list-item-content>
            <v-list-item-title>{{item.datetime}}</v-list-item-title>
            <v-list-item-content>{{ item.writer}} : {{item.con}}</v-list-item-content>
        </v-list-item-content>
        <v-btn
            icon
            @click="subCommentToggle"
        >
            <v-icon>{{ subCommentCreateToggle ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="deleteComment"
        >
            <v-icon>mdi-minus-circle</v-icon>
        </v-btn>
        </v-list-item>
        <v-expand-transition v-if="subCommentCreateToggle">
            <v-banner
            v-model="v0"
            single-line
            transition="slide-y-transition"
            >
            <v-col
                cols="12"
                sm="70"
            >
                <v-textarea
                class="mx-2"
                label="prepend-icon"
                rows="1"
                prepend-icon="mdi-comment"
                v-model="content"
                ></v-textarea>
            </v-col>
            <template v-slot:actions="{}">
                <v-btn
                text
                @click="addReComment"
                >
                post
                </v-btn>
            </template>
            </v-banner>
        </v-expand-transition>
    </v-card>
  </div>
 </template>
 <script>
import { mapActions } from 'vuex'
export default {
    name: 'CommentList',

    props: {
      item:Object,
    },
     data: () => ({
        v0: true,
       subCommentCreateToggle:false,
       content:''
    }),
    methods: {
        ...mapActions(["DeleteComment","ReplyComment"]),

      subCommentToggle() {
        this.subCommentCreateToggle = !this.subCommentCreateToggle
      },
      deleteComment() {
        this.DeleteComment(this.item.c_id)
        
      },
      addReComment(){
          let ReComment= {
              content: this.content,
              bid: this.item.bid,
              groups: this.item.groups,
              orders: this.item.orders,
              depth: this.item.depth
          }
          this.ReplyComment(ReComment)
          this.content = null
          this.subCommentCreateToggle = false
      }
   },
}
</script>
